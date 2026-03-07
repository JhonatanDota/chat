type SectionSubtitleTitleProps = {
  title: string;
};

export default function SectionSubtitle(props: SectionSubtitleTitleProps) {
  const { title } = props;

  return <h3 className="text-base font-medium text-secondary-text">{title}</h3>;
}
