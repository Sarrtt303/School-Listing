"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface SchoolFormInputs {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: number;
  email_id: string;
  image: FileList;
}

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SchoolFormInputs>();
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit: SubmitHandler<SchoolFormInputs> = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact.toString());
    formData.append("email_id", data.email_id);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    const res = await fetch("/api/addSchool", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    setMessage(result.message);
    reset();
    setPreview(null);
  };

  return (
    <div>
       
           
       
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-xl font-bold mb-4 text-black flex justify-center">Add a School</h1>
      
         <div className="flex flex-col items-center">
         {message && <p className="text-green-600 mb-2">{message}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          <label className="text-l text-black">School Name</label>
          <input placeholder="School Name" {...register("name", { required: true })} className="w-full p-2 border rounded text-black" />
          {errors.name && <p className="text-red-500">School name is required</p>}

          <label className="text-l text-black">Address</label>
          <input placeholder="Address" {...register("address", { required: true })} className="w-full p-2 border rounded text-black" />
          {errors.address && <p className="text-red-500">School Address is required</p>}

          <label className="text-l text-black">City</label>
          <input placeholder="City" {...register("city", { required: true })} className="w-full p-2 border rounded text-black" />
          {errors.address && <p className="text-red-500">City is required</p>}


          <label className="text-l text-black">State</label>
          <input placeholder="State" {...register("state", { required: true })} className="w-full p-2 border rounded text-black" />
          {errors.state && <p className="text-red-500">State is required</p>}


          <label className="text-l text-black">Contact</label>
          <input type="number" placeholder="Contact" {...register("contact", { required: true, minLength: 10 })} className="w-full p-2 border rounded text-black" />
          {errors.contact && <p className="text-red-500">Contact Information is required</p>}


          <label className="text-l text-black">Email</label>
          <input type="email" placeholder="Email" {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })} className="w-full p-2 border rounded text-black" />
          {errors.email_id && <p className="text-red-500">School Address is required</p>}

           
           <label className="text-l text-black">Upload an Image</label>
          <input 
            type="file" 
            accept="image/*"
            {...register("image", { required: true })}
            className="w-full p-2 border rounded text-black"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setPreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />

          {preview && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Preview:</p>
              <img src={preview} alt="Preview" className="mt-1 w-full h-128 object-cover rounded-lg shadow" />
            </div>
          )}

          <button type="submit" className="w-full bg-stone-700 text-white p-2 rounded hover:bg-blue-700">Submit</button>
        </form>
      </div>
    </div>
    </div>
  );
}
