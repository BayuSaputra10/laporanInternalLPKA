/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

type FormData = {
  tanggal: string
  catatan: string
  photo: File | null
}

type Errors = Partial<Record<keyof FormData, string>>

export default function CreateGensetServiceReport() {
  const router = useRouter()

  const [form, setForm] = useState<FormData>({
    tanggal: "",
    catatan: "",
    photo: null
  })

  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 shadow-sm transition-all"
  const labelClass =
    "block text-sm font-semibold text-gray-800 mb-2"

  // ✅ FIX: safer typing
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target

    if (target instanceof HTMLInputElement && target.name === "photo") {
      const file = target.files?.[0] || null

      if (file && !file.type.startsWith("image/")) {
        toast.error("Hanya file foto yang diizinkan")
        return
      }

      setForm((prev) => ({ ...prev, photo: file }))
      setErrors((prev) => ({ ...prev, photo: "" }))
      return
    }

    setForm((prev) => ({
      ...prev,
      [target.name]: target.value
    }))

    setErrors((prev) => ({
      ...prev,
      [target.name as keyof FormData]: ""
    }))
  }

  const validate = (): Errors => {
    const newErrors: Errors = {}

    if (!form.tanggal) newErrors.tanggal = "Tanggal wajib diisi"
    if (!form.catatan.trim())
      newErrors.catatan = "Catatan servis wajib diisi"
    if (!form.photo) newErrors.photo = "Foto servis wajib diupload"

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (submitting) return // ✅ prevent double submit

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error("Mohon lengkapi data yang kurang")
      return
    }

    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("tanggal", form.tanggal)
      formData.append("catatan", form.catatan)
      if (form.photo) formData.append("photo", form.photo)

      const res = await fetch("/api/reports/genset-service", {
        method: "POST",
        body: formData
      })

      let data
      try {
        data = await res.json()
      } catch {
        throw new Error("Response tidak valid")
      }

      if (!res.ok) {
        throw new Error(data?.message || "Gagal menyimpan data")
      }

      // ✅ reset form
      setForm({
        tanggal: "",
        catatan: "",
        photo: null
      })

      toast.success("Laporan servis genset berhasil dibuat!")
      router.push("/reports/genset-service")

    } catch (err: any) {
      toast.error(err.message || "Kesalahan jaringan")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen px-4 py-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-6">

        <h1 className="text-2xl font-bold mb-2">Servis Genset</h1>
        <p className="text-gray-500 mb-6">
          Laporan servis dan perawatan genset
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Tanggal */}
          <div>
            <label className={labelClass}>Tanggal *</label>
            <input
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.tanggal && <p className="text-red-500 text-sm">{errors.tanggal}</p>}
          </div>

          {/* Catatan */}
          <div>
            <label className={labelClass}>Catatan *</label>
            <textarea
              name="catatan"
              value={form.catatan}
              onChange={handleChange}
              rows={4}
              className={inputClass}
            />
            {errors.catatan && <p className="text-red-500 text-sm">{errors.catatan}</p>}
          </div>

          {/* Upload */}
          <div>
            <label className={labelClass}>Foto *</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
            />
            {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
          </div>

          {/* Button */}
          <button
            disabled={submitting}
            className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {submitting ? "Menyimpan..." : "Simpan"}
          </button>

        </form>
      </div>
    </div>
  )
}