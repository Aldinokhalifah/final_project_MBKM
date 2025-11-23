<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request) {
        $userId = $request->user()->user_id;
        $categories = Categories::where('owner_id', $userId)->get();

        if($categories->isEmpty()) {
            return response()->json([
                'message' => 'categories not found',
                'data' => []
            ], 200);
        }

        return response()->json([
            'message' => 'get all categories',
            'data' => $categories
        ], 200);
    }

    public function store(Request $request) {
        $userId = $request->user()->user_id;

        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:income,expense'
        ]);

        $category = Categories::create([
            'owner_id' => $userId,
            'name' => $request->name,
            'type' => $request->type
        ]);

        return response()->json([
            'message' => 'category created',
            'data' => $category
        ], 201);
    }

    public function show(Request $request, $id) {

        $userId = $request->user()->user_id;

        $category = Categories::where('category_id', $id)
            ->where('owner_id', $userId)
            ->first();
    
        if(!$category) {
            return response()->json([
                'message' => "category id: $id not found"
            ], 404);
        }

        return response()->json([
            'message' => 'get detail category',
            'data' => $category
        ], 200);
    }

    public function update(Request $request, $id) {
        $userId = $request->user()->user_id;

        $category = Categories::where('category_id', $id)
            ->where('owner_id', $userId)
            ->first();

        if(!$category) {
            return response()->json([
                'message' => "category id: $id not found"
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:income,expense'
        ]);

        $category->update([
            'name' => $request->name,
            'type' => $request->type
        ]);

        return response()->json([
            'message' => 'category updated',
            'data' => $category
        ], 200);
    }

    public function destroy(Request $request, $id) {
        $userId = $request->user()->user_id;

        $category = Categories::where('category_id', $id)
            ->where('owner_id', $userId)
            ->first();
    
        if(!$category) {
            return response()->json([
                'message' => "category id: $id not found"
            ], 404);
        }

        $category->delete();

        return response()->json([
            'message' => "category id: $id deleted"
        ], 200);
    }
}
