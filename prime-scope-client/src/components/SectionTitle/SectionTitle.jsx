
const SectionTitle = ({heading, description}) => {
    return (
        <div className="mx-auto text-center w-1/2 md:w-4/12 my-8">
            <h3 className="text-xl md:text-3xl font-semibold py-4">{heading}</h3>
            <p className="text-md md:text-xl text-gray-600">{description}</p>
        </div>
    );
};

export default SectionTitle;