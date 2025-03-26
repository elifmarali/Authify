import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

function LeftSection() {
  return (
    <div className="flex flex-col gap-4 h-full justify-between !px-10 !py-4">
      <Typography variant="h3" fontWeight="600">
        Sağlığınızı <br /> ve Performansınızı <br />
        Zirveye Taşıyın!
      </Typography>
      <div className="flex flex-col gap-2">
        <div className="!text-[18px]">
          Spor, sadece fiziksel bir aktivite değil, aynı zamanda bir yaşam
          tarzıdır. Güçlenmek, daha sağlıklı hissetmek ve kendinizi en iyi
          versiyonunuza taşımak için bugün bir adım atın!
        </div>
        <div>
          🏆
          <strong className="!font-black">Hedeflerinize Ulaşın</strong> - İster
          profesyonel bir sporcu olun, ister yeni başlıyor olun, başarıya giden
          yolda motivasyonunuzu koruyun.
        </div>
        <div>
          💪<strong className="!font-black">Daha Sağlıklı Bir Yaşam</strong>–
          Düzenli egzersiz, enerjinizi artırır, stresinizi azaltır ve vücudunuzu
          güçlendirir.
        </div>
        <div>
          ⚡<strong className="!font-black"> Hareket Zamanı! </strong> –
          Antrenman ipuçları, sağlıklı beslenme önerileri ve ilham veren spor
          içerikleriyle buradayız.
        </div>
        <div>
          🏋️‍♂️
          <strong className="!font-black">
            Şimdi Başla ve Kendini Keşfet!
          </strong>
        </div>
        <Link
          href="/signin"
          className="min-h-[3rem] !text-[#1976d2] !text-[16px] !font-bold !px-2 !pt-2 hover:!text-[18px] transition-all duration-300"
        >
          Devamını okuyun...
        </Link>
      </div>
    </div>
  );
}

export default LeftSection;
