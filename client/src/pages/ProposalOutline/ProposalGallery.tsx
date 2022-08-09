const ProposalGallery = () => {
    return (
        <div className='container tab-content proposal-gallery'>
            {[...new Array(4)].map((_, index) => (
                <div className='img-container' key={index}>
                    {/* <img src="" alt="" /> */}
                </div>
            ))}
        </div>
    );
};

export default ProposalGallery;
