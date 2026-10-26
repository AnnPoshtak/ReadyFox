import { authApi } from "@/api/services/auth"
import type { UserProfile } from "@/api/types"
import { User } from "lucide-react"
import { useEffect, useState } from "react"

export const ProfileButton = () => {
    const [profile, setProfile] = useState<UserProfile>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const data = await authApi.getProfile()
                setProfile(data)
            } catch (error) {
                console.error("Не вдалося завантажити профіль", error)
            } finally {
                setIsLoading(false)
            }
        }
        getUserProfile()
    }, [])

    return (
        <div className="flex items-center gap-3 px-2 py-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand)] shrink-0">
                <User className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
                {isLoading ? (
                    <div className="h-4 w-24 bg-[var(--color-outline)] rounded animate-pulse" />
                ) : (
                    <span className="text-sm font-medium text-[var(--color-foreground)] truncate">
                        {profile?.nameAndSurname || "Користувач"}
                    </span>
                )}
            </div>
        </div>
    )
}