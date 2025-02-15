async function syncronus(){
    await new Promise(Hello=>{
        setTimeout(() => {
            console.log("Hey Sync");
            Hello();
        }, 1000);
    })

    console.log("Hello ")
}
syncronus();