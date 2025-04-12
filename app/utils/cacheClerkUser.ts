import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";

export const useCacheClerkUser = () => {
  const { isLoaded, user } = useUser();

  useEffect(() => {
    const saveUserToAsyncStorage = async () => {
      if (!isLoaded || !user) {
        console.warn("⏳ Waiting for Clerk user to load...");
        return;
      }

      const userData = {
        id: user.id,
        fullName: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        primaryEmailAddress: user.primaryEmailAddress?.emailAddress ?? null,
        imageUrl: user.imageUrl ?? null,
      };

      console.log("💾 Saving user to AsyncStorage:", userData);
      await AsyncStorage.setItem("cachedUser", JSON.stringify(userData));
    };

    saveUserToAsyncStorage();
  }, [isLoaded, user]);
};
