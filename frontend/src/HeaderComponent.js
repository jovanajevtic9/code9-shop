const HeaderComponent = ({title, description}) => {
  return (
      <div className="bg-dark text-center p-5">
            <h1 className="text-white">{title}</h1>
            <p className="text-light">{description}</p>
      </div>
  );
}

export default HeaderComponent;