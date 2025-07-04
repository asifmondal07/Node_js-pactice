

export class service{


    async signup(data){
        console.log(data)
        try {
            const fromData=new FormData();
            fromData.append('name',data.name)
            fromData.append('email',data.email)
            fromData.append('phone',data.phone)
            fromData.append('password',data.Password)

            if(data.image && data.image.length > 0){
                for(let i=0; i < data.image.length; i++){
                        fromData.append('profileImage',data.image[i])
                }
            }

            const res=await fetch(' http://localhost:3000/user/signup',{
                method:'POST',
                headers: {  'Accept': 'application/json' },

                body:fromData
            })

            const result= await res.json()
             return result
        } catch (error) {
             console.log("singUp :: ", error);
            return null;
        }
    }
}

const authService=new service()

export default authService;