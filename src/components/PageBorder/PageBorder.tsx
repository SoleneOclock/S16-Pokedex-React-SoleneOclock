// children est une prop speciale de chaque composant qui est remplie par les elements situés entre la balise ouvrante et la balise fermante
interface PageBorderProps {
  title: string;
  children: React.ReactNode;
}

function PageBorder({ title, children }: PageBorderProps) {
  return (
    <div className="p-4 border-2 border-rose-600 rounded-lg m-4">
      <h2 className="text-xl">{title}</h2>
      {children}
    </div>
  );
}

export default PageBorder;
