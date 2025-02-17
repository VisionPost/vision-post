/*
  Warnings:

  - A unique constraint covering the columns `[x_userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_x_userName_key" ON "User"("x_userName");
