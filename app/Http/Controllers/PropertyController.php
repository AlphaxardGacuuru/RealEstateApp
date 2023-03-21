<?php

namespace App\Http\Controllers;

use App\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        $this->validate($request, [
            "images" => "required",
        ]);

        $property = new Property;
        $property->name = $request->input("name");
        $property->images = $request->input("images");
        $property->bedroom = $request->input("bedroom");
        $property->price = $request->input("price");
        $property->location = $request->input("location");
        $property->description = $request->input("description");
        $property->user_id = auth()->user()->id;
        $property->save();

        return response("Property create", 200);
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
            "userName" => $getProperty->user->name,
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
    public function update(Request $request, $id)
    {
        $property = Property::find($id);

        if ($request->filled("name")) {
            $property->name = $request->input("name");
        }

        if ($request->filled('images')) {
            // Delete previous image
            Storage::delete('public/' . $property->images);

            $property->images = $request->input("images");
        }

        if ($request->filled("bedroom")) {
            $property->bedroom = $request->input("bedroom");
        }

        if ($request->filled("price")) {
            $property->price = $request->input("price");
        }

        if ($request->filled("location")) {
            $property->location = $request->input("location");
        }

        if ($request->filled("description")) {
            $property->description = $request->input("description");
        }

        $property->save();

        return response("Property updated", 200);
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

    public function propertyImages(Request $request)
    {
        $images = $request->file('filepond-property-images')
            ->store('public/property-images');

        $images = substr($images, 7);

        return response($images, 200);
    }
}
