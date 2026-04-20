# Setup Guide untuk Vercel

## 1. Environment Variables di Vercel

Setelah push project ke GitHub, buka Vercel dashboard:

1. Pilih project Anda
2. Pergi ke **Settings** → **Environment Variables**
3. Tambahkan:
   - **DATABASE_URL**: URL lengkap ke database Anda (termasuk username & password)
   - **DIRECT_URL**: URL yang sama atau berbeda untuk migrations

**Format:**
```
postgresql://username:password@host:port/database_name
```

Contoh untuk Supabase:
```
postgresql://postgres.xxxxx:password@aws-0-us-west-2.pooler.supabase.com:6543/postgres
```

## 2. Running Migrations di Vercel

Setelah DATABASE_URL ter-set, jalankan migrations:

```bash
npx prisma migrate deploy
```

**ATAU** jika ingin seed data:

```bash
npx prisma migrate deploy
npm run seed
```

## 3. Troubleshooting

### ❌ Error: "Dashboard bawaan Next.js muncul"
**Solusi:**
- Cek DATABASE_URL sudah ter-set di Vercel
- Pastikan database accessible dari internet
- Cek apakah migrations sudah berjalan: `npx prisma migrate status`

### ❌ Error: "Cannot find module @prisma/client"
**Solusi:**
```bash
npm install @prisma/client prisma
npx prisma generate
```

### ❌ Error: "Connection timeout"
**Solusi:**
- Pastikan database URL benar
- Cek firewall/whitelist IP Vercel di database provider
- Vercel IP ranges perlu di-whitelist di database security settings

## 4. Vercel Deployment Checklist

- [ ] Push project ke GitHub
- [ ] Connect GitHub ke Vercel
- [ ] Set environment variables (DATABASE_URL, DIRECT_URL)
- [ ] Deploy
- [ ] Run migrations jika diperlukan
- [ ] Check Vercel logs untuk errors

## 5. Useful Commands

```bash
# Build locally
npm run build

# Check migration status
npx prisma migrate status

# View database (UI)
npx prisma studio

# Validate schema
npx prisma validate
```
