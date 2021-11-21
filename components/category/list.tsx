import Link from 'next/link';
import styles from "./category.module.scss";

export default function CategoryForm({ categories }: {
    categories: {
        image: string,
        name: string,
        url: string,
    }[];
}) {

    return (
        <>
            <div className="categories">
                <h1 className="font-weight-bold">Browse Categories</h1>
            </div>
            <div className={styles.grid}>
                {
                    categories.map((c, i) => (
                        <div className={styles.category}>
                            <Link href="/">
                                <a className="bg-light p-3 col-md-4">
                                    <div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <img
                                                    src={c.image && c.image.url}
                                                    alt={c.name}
                                                    style={{ width: '100px', height: 'auto' }}
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
                    ))
                }
            </div>


        </>
    );
}
