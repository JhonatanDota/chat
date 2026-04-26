<?php

namespace App\Http\Pagination;

use Illuminate\Contracts\Pagination\CursorPaginator;

trait CustomPagination
{
    /**
     * Converts a CursorPaginator into a simplified JSON response with has more pages information.
     *
     * @param CursorPaginator $paginator The paginator instance.
     * @param string $resourceClass The JsonResource class to apply to each item.
     *
     * @return array
     */
    public function cursorPaginationWithResource(
        CursorPaginator $paginator,
        string $resourceClass
    ): array {
        return [
            'data' => $resourceClass::collection($paginator->items()),
            'cursors' => [
                'next' => $paginator->nextCursor()?->encode(),
                'prev' => $paginator->previousCursor()?->encode(),
            ]
        ];
    }
}
