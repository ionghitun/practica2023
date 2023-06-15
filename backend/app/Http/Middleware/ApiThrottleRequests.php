<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Cache\RateLimiter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 *
 */
class ApiThrottleRequests
{
    /**
     * @param RateLimiter $limiter
     */
    public function __construct(protected RateLimiter $limiter)
    {
    }

    /**
     * @param Request $request
     * @param Closure $next
     * @param int $maxAttempts
     * @param int $decaySeconds
     * @return JsonResponse
     */
    public function handle(Request $request, Closure $next, int $maxAttempts = 60, int $decaySeconds = 60): JsonResponse
    {
        $key = $this->resolveRequestSignature($request);

        if ($this->limiter->tooManyAttempts($key, $maxAttempts)) {
            return $this->buildResponse($key, $maxAttempts);
        }

        $this->limiter->hit($key, $decaySeconds);

        $response = $next($request);

        return $this->addHeaders($response, $maxAttempts, $this->calculateRemainingAttempts($key, $maxAttempts));
    }

    /**
     * Resolve request signature.
     *
     * @param Request $request
     * @return string
     */
    protected function resolveRequestSignature(Request $request): string
    {
        return $request->fingerprint();
    }

    /**
     * @param $key
     * @param $maxAttempts
     * @return JsonResponse
     */
    protected function buildResponse($key, $maxAttempts): JsonResponse
    {
        $response = [
            'success' => false,
            'data' => null,
            'errors' => ['Too many requests attempts, please try again later!']
        ];

        $response = new JsonResponse($response, 429);

        $retryAfter = $this->limiter->availableIn($key);

        return $this->addHeaders(
            $response, $maxAttempts,
            $this->calculateRemainingAttempts($key, $maxAttempts, $retryAfter),
            $retryAfter
        );
    }

    /**
     * @param JsonResponse $response
     * @param int $maxAttempts
     * @param int $remainingAttempts
     * @param int|null $retryAfter
     * @return JsonResponse
     */
    protected function addHeaders(JsonResponse $response, int $maxAttempts, int $remainingAttempts, ?int $retryAfter = null): JsonResponse
    {
        $headers = [
            'X-RateLimit-Limit' => $maxAttempts,
            'X-RateLimit-Remaining' => $remainingAttempts,
        ];

        if (!is_null($retryAfter)) {
            $headers['Retry-After'] = $retryAfter;
            $headers['Content-Type'] = 'application/json';
        }

        $response->headers->add($headers);

        return $response;
    }

    /**
     * @param string $key
     * @param int $maxAttempts
     * @param int|null $retryAfter
     * @return int
     */
    protected function calculateRemainingAttempts(string $key, int $maxAttempts, ?int $retryAfter = null): int
    {
        if (!is_null($retryAfter)) {
            return 0;
        }

        return $this->limiter->retriesLeft($key, $maxAttempts);
    }
}
