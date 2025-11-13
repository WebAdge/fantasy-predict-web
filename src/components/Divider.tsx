type Props = {
    message: string;
}

const Divider = ({ message = 'or' }: Partial<Props>) => {
  return (
    <div className="flex items-center my-5">
        <div className="flex-grow bg-gray-400 h-px"></div>
        <div className="mx-4 text-gray-600 font-bold">{message}</div>
        <div className="flex-grow bg-gray-400 h-px"></div>
      </div>
  )
}

export default Divider;
