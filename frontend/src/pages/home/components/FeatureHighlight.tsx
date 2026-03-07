import { IconType } from "react-icons";

interface FeatureHighlightProps {
  icon: IconType;
  title: string;
  text: string;
}

export default function FeatureHighlight(props: FeatureHighlightProps) {
  const { icon: Icon, title, text } = props;

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Icon className="h-16 w-16 fill-orange-400 md:h-20 md:w-20" />
      <p className="text-2xl font-bold uppercase text-white md:text-3xl">
        {title}
      </p>
      <p className="text-base font-semibold text-slate-300 md:text-xl">
        {text}
      </p>
    </div>
  );
}
