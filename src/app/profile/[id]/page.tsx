

 export default function UserProfilePage({params}:any) {
    return (
        <div>
            <h1>Profile </h1>
            <h2 className="text-4xl ">
                Profile Page
<span className="p-2 bg-orange-500 m-2">                {params.id}
</span>
            </h2>
        </div>
    )
}