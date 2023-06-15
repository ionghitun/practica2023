<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        //Clear forgot passwords expired token
        $schedule->command('auth:clear-resets')->everyFifteenMinutes()->appendOutputTo(storage_path('logs/cron/auth-clear-resets.log'));

        //Prune stale cache tags
        $schedule->command('cache:prune-stale-tags')->hourly()->appendOutputTo(storage_path('logs/cron/cache-prune-stale-tags.log'));

        //Daily inspiration
        $schedule->command('inspire')->dailyAt('00:00')->appendOutputTo(storage_path('logs/cron/inspire.log'));

        //Delete sanctum expired tokens
        $schedule->command('sanctum:prune-expired')->dailyAt('00:30')->appendOutputTo(storage_path('logs/cron/sanctum-prune-expired.log'));

    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
