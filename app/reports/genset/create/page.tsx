"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type FormData = {
  regu: string
  tanggal: string
  waktuPemakaianJam: number | null
  hourMeterAwal: number | null
  hourMeterAkhir: number | null
  solarLevelAwal: number | null
  solarLevelAkhir: number | null
  photo: File | null
}

type Errors = Partial<Record<keyof FormData, string>>

export default function CreateGensetReport() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>({
    regu: '',
    tanggal: '',
    waktuPemakaianJam: null,
    hourMeterAwal: null,
    hourMeterAkhir: null,
    solarLevelAwal: null,
    solarLevelAkhir: null,
    photo: null
  })

  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)

  const inputClass = 'w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition'

  const labelClass = 'text-sm font-semibold text-gray-700'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target

    if (name === 'photo') {
      const file = files?.[0] || null
      if (file && !file.type.startsWith('image/')) {
        toast.error('❌ Hanya file foto yang diizinkan (jpg, png, gif, etc.)')
        return
      }
      setForm(prev => ({ ...prev, photo: file }))
      setErrors(prev => ({ ...prev, photo: '' }))
      return
    }

    const numericFields = [
      'waktuPemakaianJam',
      'hourMeterAwal',
      'hourMeterAkhir',
      'solarLevelAwal',
      'solarLevelAkhir'
    ]

    if (numericFields.includes(name)) {
      const num = value === '' ? null : Number(value)
      setForm(prev => ({
        ...prev,
        [name]: isNaN(num!) ? null : num
      }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }

    setErrors(prev => ({ ...prev, [name as keyof FormData]: '' }))
  }

  const validate = (): Errors => {
    const newErrors: Errors = {}

    if (!form.regu.trim()) newErrors.regu = 'Regu wajib diisi'
    if (!form.tanggal) newErrors.tanggal = 'Tanggal wajib diisi'

    if (!form.waktuPemakaianJam || form.waktuPemakaianJam <= 0)
      newErrors.waktuPemakaianJam = 'Harus lebih dari 0 jam'

    if (form.hourMeterAwal == null || form.hourMeterAwal < 0)
      newErrors.hourMeterAwal = 'Hour meter awal tidak valid'

    if (
      form.hourMeterAkhir == null ||
      form.hourMeterAwal == null ||
      form.hourMeterAkhir <= form.hourMeterAwal
    )
      newErrors.hourMeterAkhir = 'Hour meter akhir harus > awal'

    if (
      form.solarLevelAwal == null ||
      form.solarLevelAwal < 0 ||
      form.solarLevelAwal > 100
    )
      newErrors.solarLevelAwal = 'Solar awal 0-100%'

    if (
      form.solarLevelAkhir == null ||
      form.solarLevelAkhir < 0 ||
      form.solarLevelAkhir > 100
    )
      newErrors.solarLevelAkhir = 'Solar akhir 0-100%'

    if (
      form.solarLevelAwal != null &&
      form.solarLevelAkhir != null &&
      form.solarLevelAkhir > form.solarLevelAwal
    )
      newErrors.solarLevelAkhir = 'Solar akhir ≤ awal'

    if (!form.photo) {
      newErrors.photo = 'Foto wajib diupload'
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error('⚠️ Mohon lengkapi data yang kurang')
      return
    }

    setSubmitting(true)

    try {
      const solarPemakaian =
        (form.solarLevelAwal ?? 0) - (form.solarLevelAkhir ?? 0)

      const formData = new FormData()
      formData.append('regu', form.regu)
      formData.append('tanggal', form.tanggal)
      formData.append('waktuPemakaianJam', String(form.waktuPemakaianJam!))
      formData.append('hourMeterAwal', String(form.hourMeterAwal!))
      formData.append('hourMeterAkhir', String(form.hourMeterAkhir!))
      formData.append('solarLevelAwal', String(form.solarLevelAwal!))
      formData.append('solarLevelAkhir', String(form.solarLevelAkhir!))
      formData.append('solarPemakaian', String(solarPemakaian))

      if (form.photo) formData.append('photo', form.photo)

      const res = await fetch('/api/reports/genset', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast.success('✅ Laporan genset berhasil dibuat!')
        router.push('/')
      } else {
        toast.error(data.message || '❌ Gagal membuat laporan genset')
      }
    } catch (error) {
      toast.error('❌ Kesalahan jaringan')
    } finally {
      setSubmitting(false)
    }
  }

  const solarPreview =
    form.solarLevelAwal != null && form.solarLevelAkhir != null
      ? form.solarLevelAwal - form.solarLevelAkhir
      : null

  return (
    <div className='min-h-screen bg-slate-900 flex items-center justify-center p-6'>
      <div className='w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden'>

        {/* HEADER */}
        <div className='bg-gradient-to-r from-green-600 to-green-700 p-6 text-white'>
          <h1 className='text-2xl font-bold'>📋 Laporan Genset</h1>
          <p className='text-green-100 text-sm'>Input data operasional harian</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className='p-6 space-y-6'>

          {/* BASIC */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className={labelClass}>Regu *</label>
              <input name='regu' value={form.regu} onChange={handleChange} className={inputClass}/>
              {errors.regu && <p className='text-red-500 text-xs mt-1'>{errors.regu}</p>}
            </div>

            <div>
              <label className={labelClass}>Tanggal *</label>
              <input type='date' name='tanggal' value={form.tanggal} onChange={handleChange} className={inputClass}/>
              {errors.tanggal && <p className='text-red-500 text-xs mt-1'>{errors.tanggal}</p>}
            </div>
          </div>

          {/* JAM */}
          <div>
            <label className={labelClass}>Waktu Pemakaian (Jam) *</label>
            <input type='number' name='waktuPemakaianJam' value={form.waktuPemakaianJam ?? ''} onChange={handleChange} className={inputClass}/>
            {errors.waktuPemakaianJam && <p className='text-red-500 text-xs mt-1'>{errors.waktuPemakaianJam}</p>}
          </div>

          {/* HOUR METER */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className={labelClass}>HM Awal *</label>
              <input type='number' name='hourMeterAwal' value={form.hourMeterAwal ?? ''} onChange={handleChange} className={inputClass}/>
              {errors.hourMeterAwal && <p className='text-red-500 text-xs mt-1'>{errors.hourMeterAwal}</p>}
            </div>

            <div>
              <label className={labelClass}>HM Akhir *</label>
              <input type='number' name='hourMeterAkhir' value={form.hourMeterAkhir ?? ''} onChange={handleChange} className={inputClass}/>
              {errors.hourMeterAkhir && <p className='text-red-500 text-xs mt-1'>{errors.hourMeterAkhir}</p>}
            </div>
          </div>

          {/* SOLAR */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className={labelClass}>Solar Awal (%) *</label>
              <input type='number' name='solarLevelAwal' value={form.solarLevelAwal ?? ''} onChange={handleChange} className={inputClass}/>
              {errors.solarLevelAwal && <p className='text-red-500 text-xs mt-1'>{errors.solarLevelAwal}</p>}
            </div>

            <div>
              <label className={labelClass}>Solar Akhir (%) *</label>
              <input type='number' name='solarLevelAkhir' value={form.solarLevelAkhir ?? ''} onChange={handleChange} className={inputClass}/>
              {errors.solarLevelAkhir && <p className='text-red-500 text-xs mt-1'>{errors.solarLevelAkhir}</p>}
            </div>
          </div>

          {solarPreview != null && (
            <div className='bg-green-50 text-green-700 p-3 rounded-lg text-sm'>
              Pemakaian Solar: <strong>{solarPreview}%</strong>
            </div>
          )}

          {/* FILE */}
          <div>
            <label className={labelClass}>Upload Foto *</label>
            <input type='file' name='photo' accept='image/*' onChange={handleChange} />
            {errors.photo && <p className='text-red-500 text-xs mt-1'>{errors.photo}</p>}
          </div>

          {/* BUTTON */}
          <button
            disabled={submitting}
            className='w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition'
          >
            {submitting ? 'Menyimpan...' : 'Simpan Laporan'}
          </button>

        </form>
      </div>
    </div>
  )
}
