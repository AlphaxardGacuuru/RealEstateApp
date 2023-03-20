<?php

namespace App\Http\Controllers;

use App\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getProperty = Property::all();

        $property = [];

        foreach ($getProperty as $item) {
            array_push($property, [
                "id" => $item->id,
                "name" => $item->name,
                "images" => "/storage/" . $item->images,
                "bedroom" => $item->bedroom,
                "price" => $item->price,
                "location" => $item->location,
                "description" => $item->description,
                "user_id" => $item->user_id,
            ]);
        }

        return response($property, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Property  $property
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $getProperty = Property::find($id);

        $property = [];

        array_push($property, [
            "id" => $getProperty->id,
            "name" => $getProperty->name,
            "images" => "/storage/" . $getProperty->images,
            "bedroom" => $getProperty->bedroom,
            "price" => $getProperty->price,
            "location" => $getProperty->location,
            "description" => $getProperty->description,
            "user_id" => $getProperty->user_id,
            "phone" => $getProperty->user->phone,
        ]);

        return response($property, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Property  $property
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Property $property)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Property  $property
     * @return \Illuminate\Http\Response
     */
    public function destroy(Property $property)
    {
        //
    }
}
