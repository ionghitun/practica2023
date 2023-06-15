<?php

namespace App\Services;


use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;

/**
 *
 */
class BaseService
{
    /**
     * @param $path
     * @param $image
     * @param $name
     * @param bool $generateAvatar
     * @param bool $onlyAvatar
     * @return false|string
     */
    public static function processImage($path, $image, $name, bool $generateAvatar = false, bool $onlyAvatar = false): false|string
    {
        $pictureData = [];

        if ($generateAvatar) {
            $avatarImage = Image::make($image)->resize(200, 200, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });

            $color = self::getColorAverage($avatarImage);

            $avatarCanvas = Image::canvas(200, 200, $color);

            $avatarCanvas->insert($avatarImage, 'center');

            $avatarPath = $path . 'avatar/';
            File::makeDirectory($avatarPath, 0777, true, true);

            $avatarCanvas->save($avatarPath . $name, 100);

            $pictureData['avatar'] = $avatarPath . $name;
        }

        if ($onlyAvatar) {
            return json_encode($pictureData);
        }

        $mediumImage = Image::make($image)->resize(1024, 768, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });

        $mediumPath = $path . 'medium/';
        File::makeDirectory($mediumPath, 0777, true, true);

        $mediumImage->save($mediumPath . $name, 100);
        $pictureData['medium'] = $mediumPath . $name;

        $originalMaxImage = Image::make($image)->resize(1920, 1080, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });

        $originalPath = $path . 'original/';
        File::makeDirectory($originalPath, 0777, true, true);

        $originalMaxImage->save($originalPath . $name, 100);
        $pictureData['original'] = $originalPath . $name;

        return json_encode($pictureData);
    }

    /**
     * Get average image color.
     *
     * @param $image
     *
     * @return array
     */
    private static function getColorAverage($image): array
    {
        $image = clone $image;

        $color = $image->limitColors(1)->pickColor(0, 0);
        $image->destroy();

        return $color;
    }
}
