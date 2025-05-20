import Image from "next/image";

interface ResourceCardProps {
  title: string;
  description: string;
  image: string;
}

export default function ResourceCard({
  title,
  description,
  image,
}: ResourceCardProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-14 w-24 overflow-hidden rounded-md">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={56}
          height={56}
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}
