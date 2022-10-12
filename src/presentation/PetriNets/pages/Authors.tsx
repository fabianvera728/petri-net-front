export const Authors = () => {
    return <div className="grid gap-3 mb-6 p-6 bg-white flex-column">
        <div className="flex bg-white flex-row align-items-center justify-content-between w-full">
            <div className="flex flex-column pl-8">
                <span className="text-4xl text-black font-bold" style={{}}>Fabian Vera</span>
                <span className="text-4xl text-black font-bold ">Ing. Sistemas</span>
                <p className="pr-4 text-xl">Full Stack Developer. 👨🏻‍💻
                    Visitar pueblitos 📍, aprender 🧠, amante de los caballos 🐎</p>
            </div>
            <div>
                <img width={"500rem"} height={"420rem"} src="assets/fabian_profile_author.webp"
                     alt="Fabian Vera - Author image"/>
            </div>
        </div>
        <div className="flex bg-white flex-row align-items-center justify-content-between w-full">
            <div className="flex">
                <img width={"413rem"} height={"347rem"} src="assets/alejandro_author.webp"
                     alt="Alejandro Carrillo - Author image"/>
            </div>
            <div className="flex flex-column pr-8" style={{width: "70%"}}>
                <span className="text-4xl text-black font-bold">Alejando Fernandez</span>
                <span className="text-4xl font-bold">Ing. Sistemas</span>
                <p className="pr-4 text-xl">Data Enginner Jr.
                    Recorrer senderos ⛰️ , escuchar música 🎵 y una buena pola🍺</p>
            </div>

        </div>
    </div>;
}