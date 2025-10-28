<?php

namespace HollisLabs\UiBuilder\Http\Controllers;

use Illuminate\Routing\Controller;
use HollisLabs\UiBuilder\Services\DataSourceResolver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TypesController extends Controller
{
    public function __construct(
        private DataSourceResolver $resolver
    ) {}

    public function query(Request $request, string $alias): JsonResponse
    {
        try {
            $params = [
                'search' => $request->input('search'),
                'filters' => $request->input('filters', []),
                'sort' => [
                    'field' => $request->input('sort', 'updated_at'),
                    'direction' => $request->input('direction', 'desc'),
                ],
                'pagination' => [
                    'per_page' => $request->input('per_page', 15),
                    'page' => $request->input('page', 1),
                ],
            ];

            $result = $this->resolver->query($alias, $params);

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 404);
        }
    }

    public function show(string $alias, mixed $id): JsonResponse
    {
        try {
            $result = $this->resolver->show($alias, $id);

            if (!$result) {
                return response()->json([
                    'error' => 'Record not found',
                ], 404);
            }

            return response()->json([
                'data' => $result,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 404);
        }
    }
}
