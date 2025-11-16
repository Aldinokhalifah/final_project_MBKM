<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Outlets;
use Illuminate\Http\Request;

class OutletController extends Controller
{
    public function index(Request $request) {
        $userId = $request->user()->user_id;
        $outlets = Outlets::where('owner_id', $userId)->get();

        if($outlets->isEmpty()) {
            return response()->json([
                'message' => 'outlets not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'message' => 'get all outlets',
            'data' => $outlets
        ], 200);
    }

    public function store(Request $request) {
        $userId = $request->user()->user_id;

        $request->validate([
            'name' => 'required|string|unique:outlets,name',
            'address' => 'nullable|string'
        ]);

        $outlet = Outlets::create([
            'owner_id' => $userId,
            'name' => $request->name,
            'address' => $request->address
        ]);

        return response()->json([
            'message' => 'outlet creates successfully',
            'data' => $outlet
        ], 201);
    }

    public function show(Request $request, $id) {
        $userId = $request->user()->user_id;

        $outlet = Outlets::where('outlet_id', $id)
        ->where('owner_id', $userId)
        ->first();

        if(!$outlet) {
            return response()->json([
                'message' => 'outlet not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'message' => 'get all outlets',
            'data' => $outlet
        ], 200);
    }

    public function update(Request $request, $id) {
        $userId = $request->user()->user_id;

        $outlet = Outlets::where('outlet_id', $id)
        ->where('owner_id', $userId)
        ->first();

        if(!$outlet) {
            return response()->json([
                'message' => 'outlet not found',
                'data' => []
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|unique:outlets,name',
            'address' => 'nullable|string'
        ]);

        $outlet->update([
            'owner_id' => $userId,
            'name' => $request->name,
            'address' => $request->address
        ]);

        return response()->json([
            'message' => 'outlet updated',
            'data' => $outlet
        ], 200);
    }

    public function destroy(Request $request, $id) {
        $userId = $request->user()->user_id;

        $outlet = Outlets::where('outlet_id', $id)
        ->where('owner_id', $userId)
        ->first();

        if(!$outlet) {
            return response()->json([
                'message' => 'outlet not found',
                'data' => []
            ], 404);
        }

        $outlet->delete();

        return response()->json([
            'message' => "outlet id: $id deleted"
        ], 200);
    }
}
