-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'visitor';

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

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "Houses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_visitor_id_fkey" FOREIGN KEY ("visitor_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Houses" ADD CONSTRAINT "Houses_owned_by_fkey" FOREIGN KEY ("owned_by") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MeterReads" ADD CONSTRAINT "MeterReads_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MeterReads" ADD CONSTRAINT "MeterReads_posted_by_fkey" FOREIGN KEY ("posted_by") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
