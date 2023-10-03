interface LabelProps {
  name?: string;
  measures?: string
}

export const Label = ({ name }: LabelProps) => {
  return (
    <div className="flew-grow sm:flex-grow-0 py-1 px-3 bg-yellow-200 text-black text-center rounded-lg hover:font-bold durantion-200">
      {name}
    </div>
  );
};
