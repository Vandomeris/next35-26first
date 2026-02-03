import { registerUser } from "@/lib/serverActions";

export default function RegisterPage() {
    return (
        <div>
            <form action={registerUser}>
                <input name="username" type="text" placeholder="Ник" />
                <input name="age" type="number" placeholder="Возраст" />
                <input name="email" type="email" placeholder="Почта" />
                <input name="password" type="password" placeholder="Пароль" />
                <button>Зарегистрироваться</button>
            </form>
        </div>
    )
}
