<?php

namespace App\Services\Storage;

use Exception;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;

class FileService
{
    public string $disk;

    public function __construct()
    {
        $this->disk = $this->resolveDiskForEnvironment();
    }

    private function resolveDiskForEnvironment(): string
    {
        return match (app()->environment()) {
            'production' => 's3',
            default => 'public',
        };
    }

    public function upload(UploadedFile $file, string $path = '')
    {
        try {
            return $file->store($path, $this->disk);
        } catch (Exception $e) {
            Log::error('Error uploading file: ' . $e->getMessage());
        }
    }
}
