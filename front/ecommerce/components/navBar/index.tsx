import Link from "next/link";

export default function NavBar(){
    return (
        <div className="flex flex-row align-middle justify-between p-4 bg-violet-300 shadow-md">
            <h1>My Navigation Bar</h1>
            <ul className="flex flex-row space-x-3">
                <li className="text-white hover:text-black"><Link href="/">Home</Link></li>
                <li className="text-white hover:text-black"><Link href="/productlist">Products</Link></li>
                <li className="text-white hover:text-black"><Link href="/user/userprofile">My Profile</Link></li>
                <li className="text-white hover:text-black"><Link href="/login">SingIn</Link></li>
                <li className="text-white hover:text-black"><Link href="/register">SingUp</Link></li>
            </ul>
        </div>
    )
}