import Link from "next/link";
import Image from "next/image";

import styles from "./category.module.scss";

export default function CategoryForm({
  categories,
}: {
  categories: {
    image: string;
    name: string;
    url: string;
  }[];
}) {
  return (
    <>
      <div className="categories">
        <h1 className="font-weight-bold">Browse Categories</h1>
      </div>
      <div className={styles.grid}>
        {categories.map((c, i) => (
          <div className={styles.category} key={i}>
            <Link href={`/links/${c.slug}`}>
              <a className="bg-light p-3 col-md-4">
                <div>
                  <div className="row">
                    <div className="col-md-4">
                      <Image
                        src={c.image && c.image.url}
                        alt={c.name}
                        width={100}
                        height={100}
                        className="pr-3"
                      />
                    </div>
                    <div className="col-md-8">
                      <h3>{c.name}</h3>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
