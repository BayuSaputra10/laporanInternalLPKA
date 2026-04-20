/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import toast from "react-hot-toast"

const VEHICLE_ITEMS = [
  { id: 1, name: "Radiator" },
  { id: 2, name: "Oli" },
  { id: 3, name: "Ban" }
]

export default function CreateVehicleReport() {

  const initialForm = {
    vehicleName: "",
    kmAwal: "",
    kmAkhir: "",
    solarAwal: "",
    solarAkhir: "",
    catatan: ""
  }

  const [form, setForm] = useState(initialForm)
  const [inspections, setInspections] = useState(
    VEHICLE_ITEMS.map(item => ({
      itemId: item.id,
      kondisi: "Normal",
      keterangan: ""
    }))
  )
  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

    setErrors({
      ...errors,
      [e.target.name]: ""
    })
  }

  const handleInspectionChange = (index: number, field: string, value: string) => {
    const newInspections = [...inspections]
    newInspections[index] = { ...newInspections[index], [field]: value }
    setInspections(newInspections)
  }

  const validate = () => {
    const newErrors: any = {}

    if (!form.vehicleName) newErrors.vehicleName = "Wajib diisi"
    if (!form.kmAwal) newErrors.kmAwal = "Wajib diisi"
    if (!form.kmAkhir) newErrors.kmAkhir = "Wajib diisi"
    if (Number(form.kmAkhir) < Number(form.kmAwal)) {
      newErrors.kmAkhir = "KM tidak valid"
    }
    if (!form.solarAwal) newErrors.solarAwal = "Wajib diisi"
    if (!form.solarAkhir) newErrors.solarAkhir = "Wajib diisi"

    return newErrors
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error("Form belum lengkap")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/reports/vehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          kmAwal: Number(form.kmAwal),
          kmAkhir: Number(form.kmAkhir),
          solarAwal: Number(form.solarAwal),
          solarAkhir: Number(form.solarAkhir),
          inspections
        })
      })

      if (!res.ok) throw new Error()

      toast.success("Laporan berhasil disimpan")

      setForm(initialForm)
      setInspections(
        VEHICLE_ITEMS.map(item => ({
          itemId: item.id,
          kondisi: "Normal",
          keterangan: ""
        }))
      )
      setErrors({})

    } catch {
      toast.error("Gagal menyimpan data")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-700 p-6">
      <div className="max-w-2xl mx-auto bg-slate-400 p-6 rounded-2xl shadow">

        <h1 className="text-2xl font-bold mb-6">Form Kendaraan</h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAMA */}
          <div>
            <input
              name="vehicleName"
              value={form.vehicleName}
              placeholder="Nama Kendaraan"
              className="w-full border p-2 rounded"
              onChange={handleChange}
            />
            {errors.vehicleName && (
              <p className="text-red-500 text-sm">{errors.vehicleName}</p>
            )}
          </div>

          {/* KM */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="kmAwal"
                value={form.kmAwal}
                placeholder="KM Awal"
                className="border p-2 rounded w-full"
                onChange={handleChange}
              />
              {errors.kmAwal && (
                <p className="text-red-500 text-sm">{errors.kmAwal}</p>
              )}
            </div>

            <div>
              <input
                name="kmAkhir"
                value={form.kmAkhir}
                placeholder="KM Akhir"
                className="border p-2 rounded w-full"
                onChange={handleChange}
              />
              {errors.kmAkhir && (
                <p className="text-red-500 text-sm">{errors.kmAkhir}</p>
              )}
            </div>
          </div>

          {/* SOLAR */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="solarAwal"
                value={form.solarAwal}
                placeholder="Solar Awal"
                className="border p-2 rounded w-full"
                onChange={handleChange}
              />
              {errors.solarAwal && (
                <p className="text-red-500 text-sm">{errors.solarAwal}</p>
              )}
            </div>

            <div>
              <input
                name="solarAkhir"
                value={form.solarAkhir}
                placeholder="Solar Akhir"
                className="border p-2 rounded w-full"
                onChange={handleChange}
              />
              {errors.solarAkhir && (
                <p className="text-red-500 text-sm">{errors.solarAkhir}</p>
              )}
            </div>
          </div>

          {/* CATATAN */}
          <textarea
            name="catatan"
            value={form.catatan}
            placeholder="Catatan"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          {/* INSPECTIONS */}
          <div>
            <h2 className="font-semibold mb-2">Pemeriksaan Item</h2>
            <div className="space-y-3">
              {VEHICLE_ITEMS.map((item, index) => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-white rounded-lg">
                  <span className="font-medium w-32">{item.name}</span>
                  <select
                    value={inspections[index].kondisi}
                    onChange={(e) => handleInspectionChange(index, 'kondisi', e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Bocor">Bocor</option>
                    <option value="Buntu">Buntu</option>
                    <option value="Pecah">Pecah</option>
                    <option value="Kendur">Kendur</option>
                    <option value="Putus">Putus</option>
                    <option value="Kurang">Kurang</option>
                    <option value="Kotor">Kotor</option>
                    <option value="Panas">Panas</option>
                    <option value="Terbakar">Terbakar</option>
                    <option value="Rusak">Rusak</option>
                  </select>
                  <input
                    placeholder="Keterangan (opsional)"
                    value={inspections[index].keterangan}
                    onChange={(e) => handleInspectionChange(index, 'keterangan', e.target.value)}
                    className="flex-1 border p-1 rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>

        </form>
      </div>
    </div>
  )
}