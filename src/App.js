function App() {
	let url_add = "";
	if (process.env.NODE_ENV === "development") url_add = "http://localhost:80";

	// fetch(url_add + "/getDatabase")
	// 	.then((res) => res.json())
	// 	.then((data) => {
	// 		console.log(data[0][1]);
	// 	});

	// fetch(url_add + "/getDatabase").then((e) => console.log(e));
	fetch(url_add + "/getDatabase")
		.then((res) => res.json())
		.then((data) => {
			console.log(data[0]);
		});

	return <div className="App"></div>;
}

export default App;
