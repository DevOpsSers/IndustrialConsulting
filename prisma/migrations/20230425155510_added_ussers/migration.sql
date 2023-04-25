/*
  Warnings:

  - You are about to drop the `Agency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookingReading` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Guest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Home` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Visit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VisitReading` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_guestId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_homeId_fkey";

-- DropForeignKey
ALTER TABLE "BookingReading" DROP CONSTRAINT "BookingReading_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "BookingReading" DROP CONSTRAINT "BookingReading_guestId_fkey";

-- DropForeignKey
ALTER TABLE "Home" DROP CONSTRAINT "Home_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_homeId_fkey";

-- DropForeignKey
ALTER TABLE "VisitReading" DROP CONSTRAINT "VisitReading_visitId_fkey";

-- DropTable
DROP TABLE "Agency";

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "BookingReading";

-- DropTable
DROP TABLE "Guest";

-- DropTable
DROP TABLE "Home";

-- DropTable
DROP TABLE "Visit";

-- DropTable
DROP TABLE "VisitReading";

-- CreateTable
CREATE TABLE "Bookings" (
    "id" SERIAL NOT NULL,
    "visitor_id" TEXT NOT NULL,
    "house_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Houses" (
    "id" SERIAL NOT NULL,
    "owned_by" TEXT NOT NULL,
    "address_line_1" TEXT,
    "address_line_2" TEXT,
    "image_url" TEXT,
    "house_name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "kw_h_cost" SMALLINT,

    CONSTRAINT "Houses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeterReads" (
    "id" SERIAL NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "posted_by" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "img_url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MeterReads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "phone_number" TEXT,
    "name" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "Houses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_visitor_id_fkey" FOREIGN KEY ("visitor_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Houses" ADD CONSTRAINT "Houses_owned_by_fkey" FOREIGN KEY ("owned_by") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MeterReads" ADD CONSTRAINT "MeterReads_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MeterReads" ADD CONSTRAINT "MeterReads_posted_by_fkey" FOREIGN KEY ("posted_by") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
