-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "expires_at" INTEGER DEFAULT 0,
ADD COLUMN     "refresh_token" TEXT DEFAULT '',
ADD COLUMN     "scope" TEXT DEFAULT '',
ADD COLUMN     "token_type" TEXT DEFAULT '',
ALTER COLUMN "access_token" SET DEFAULT '';
