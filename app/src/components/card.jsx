function Card({title, url}){
    return (
        <div className="w-20 bg-black rounded-2xl h-30">
            <h1>{title}</h1>
            <img src={url} alt="" />
        </div>
    )
}