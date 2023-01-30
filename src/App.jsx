import { useEffect, useState } from "react";

const App = () => {
    const [languages, setLanduages] = useState([]);
    const [form, setForm] = useState({
        source: "Hello, world!",
        output: "Привет, мир!",
        lang: "ru"
    });

    // вывод языков в option
    useEffect(() => {
        fetch("https://google-translate1.p.rapidapi.com/language/translate/v2/languages", {
            headers: {
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_API_HOST
            }
        }).then((response) => response.json()).then((data) => {
            setLanduages(data.data.languages);
        });
    }, []);

    const LanguageOptions = languages.map(({ language }) => {
        return (
            <option key={language} value={language}>
                {language}
            </option>
        )
    });

    // событие при нажатии на кнопку -> перевод текста
    const onCLickTranslateHandle = () => {
        const body = {
            q: "Hello my dear friend!",
            target: "ru",
            source: "en"
        };

        fetch("https://google-translate1.p.rapidapi.com/language/translate/v2", {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Accept-Encoding': 'application/json',
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_API_HOST
            },
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    };

    return (
        <section>
            <div className="container">
                <div className="wrapper">
                    <h1>Translate</h1>

                    <div className="form">
                        {/* левая часть */}
                        <div className="form__left">
                            <textarea name="sourse">
                                Hello, world!
                            </textarea>
                        </div>

                        {/* правая часть */}
                        <div className="form__right">
                            <select name="lang">
                                {LanguageOptions}
                            </select>

                            <textarea name="output">
                                Привет, мир!
                            </textarea>
                        </div>
                    </div>

                    <button onClick={onCLickTranslateHandle}>Translate Now</button>
                </div>
            </div>
        </section>
    );
}

export default App;