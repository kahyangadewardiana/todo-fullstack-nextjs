-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('RENDAH', 'SEDANG', 'TINGGI');

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'SEDANG';
