// TOD/tod/apps-web/components/homepage/MinimalistTemplateCard.tsx
import Link from "next/link";
import Image from "next/image";

export default function MinimalistTemplateCard() {
  return (
    <Link
      href="/tod/templates/minimalist"
      className="group block rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all"
    >
      {/* Screenshot preview */}
      <div className="relative h-52 bg-gradient-to-br from-purple-100 to-purple-200 overflow-hidden">
        <Image
          src="/tod/minimalist.png"  // make sure the file exists in /public/tod/
          alt="Minimalist Template Preview"
          fill
          className="object-cover opacity-90 group-hover:scale-105 transition-transform"
        />

        {/* Soft overlay like SaaS */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900">Minimalist</h3>

        <p className="text-sm text-gray-600 mt-1">
          A clean, soft layout inspired by mobile todo apps.
        </p>

        <button className="mt-4 w-full rounded-xl border border-indigo-500 text-indigo-600 py-2 text-sm font-medium hover:bg-indigo-50 transition">
          Use Template
        </button>
      </div>
    </Link>
  );
}
