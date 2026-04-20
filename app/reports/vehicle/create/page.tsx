/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import toast from "react-hot-toast"

const VEHICLE_ITEMS = [
  { id: 1, name: "Radiator" },
  { id: 2, name: "Oli" },
  { id: 3, name: "Ban" }
]

export default function CreateVehicleReport() {

  const initialForm = {
    tanggal: "",
    unit: "",
    kmAwal: "",
    kmAkhir: "",
    solarAwal: "",
    solarAkhir: "",
    catatan: ""
  }

  const [form, setForm] = useState(initialForm)
  const [inspectionItems, setInspectionItems] = useState(VEHICLE_ITEMS)
  const [inspections, setInspections] = useState(
    VEHICLE_ITEMS.map(item => ({
      itemId: item.id,
      kondisi: "Normal",
      keterangan: ""
    }))
  )
  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadInspectionItems() {
      try {
        const res = await fetch("/api/inspection-items?type=vehicle")
        if (!res.ok) {
          return
        }

        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          setInspectionItems(data)
          setInspections(
            data.map((item: any) => ({
              itemId: item.id,
              kondisi: "Normal",
              keterangan: ""
            }))
          )
        }
      } catch (error) {
        console.error("Failed to load vehicle inspection items", error)
      }
    }

    loadInspectionItems()
  }, [])

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

    if (!form.tanggal) newErrors.tanggal = "Wajib diisi"
    if (!form.unit) newErrors.unit = "Wajib diisi"
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
          tanggal: form.tanggal,
          unit: form.unit,
          kmAwal: Number(form.kmAwal),
          kmAkhir: Number(form.kmAkhir),
          solarAwal: Number(form.solarAwal),
          solarAkhir: Number(form.solarAkhir),
          catatan: form.catatan,
          inspections
        })
      })

      if (!res.ok) throw new Error()

      toast.success("Laporan berhasil disimpan")

      setForm(initialForm)
      setInspections(
        inspectionItems.map(item => ({
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

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Form Kendaraan</h1>
            <p className="text-sm text-slate-700">Tambah laporan kendaraan dengan informasi lengkap dan inspeksi.</p>
          </div>
          <Link href="/" className="inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
            ← Dashboard
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* TANGGAL */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-800">Tanggal</label>
            <input
              type="date"
              name="tanggal"
              value={form.tanggal}
              className="w-full border p-2 rounded"
              onChange={handleChange}
            />
            {errors.tanggal && <p className="text-red-500 text-sm mt-1">{errors.tanggal}</p>}
          </div>

          {/* NAMA */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-800">Unit Kendaraan</label>
            <input
              name="unit"
              value={form.unit}
              placeholder="Unit Kendaraan"
              className="w-full border p-2 rounded"
              onChange={handleChange}
            />
            {errors.unit && (
              <p className="text-red-500 text-sm">{errors.unit}</p>
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
              {inspectionItems.map((item, index) => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-white rounded-lg">
                  <span className="font-medium w-32">{item.name}</span>
                  <select
                    value={inspections[index]?.kondisi ?? "Normal"}
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
                    value={inspections[index]?.keterangan ?? ""}
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