import Image from "next/image";
import styles from "./SearchButton.module.scss";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import spinnerStyles from "@/components/LoadingSpinner/LoadingSpinner.module.scss";

interface SearchButtonProps {
  isLoading: boolean;
}

export default function SearchButton({ isLoading = false }: SearchButtonProps) {
  return (
    <button type="submit" className={styles["search-button"]} disabled={isLoading}>
      {isLoading ? (
        <LoadingSpinner className={spinnerStyles.SearchButton} />
      ) : (
        <div className={styles["search-icon-wrapper"]}>
          <Image src="/images/search.svg" alt="search" width={21} height={21} />
        </div>
      )}
    </button>
  );
}
