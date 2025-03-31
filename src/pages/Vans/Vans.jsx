import React from "react"
import {
    Link,
    useSearchParams,
    useLoaderData,
    defer,
    Await
} from "react-router-dom"
import { getVans } from "../../api"
import { Suspense } from "react" 

export function loader() {
    return defer({ vans: getVans() })
}

export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams()
    const dataPromise = useLoaderData()

    const typeFilter = searchParams.get("type")

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

        function renderVanElements(vans) {
            const displayedVans = typeFilter
                ? vans.filter(van => van.type === typeFilter)
                : vans
            console.log(vans[0])
            const vanElements = displayedVans.map(van => (
                <div key={van.vanid} className="van-tile px-4">
                    <Link
                        to={`${van.vanid}`}
                        state={{
                            search: `?${searchParams.toString()}`,
                            type: typeFilter
                        }}
                    >
                        <img src={van.image} />
                        <div className="van-info my-2 flex justify-between mb-5 ">
                            <h3 className="">{van.name}</h3>
                            <p className="font-bold"> ${van.price}<span>/day</span></p>
                        </div>
                        <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    </Link>
                </div>
            ))
            return (
                <>
                    <div className="van-list">
                        {vanElements}
                    </div>
                </>
            )
        }

    return (
        <main className="w-full flex justify-center">
            <div className="van-list-container translate-y-5 mx-2 md:w-10/12 w-full">
                <h1 className="mb-3">Explore our van options</h1>
                <div className="van-list-filter-buttons ">
                    <button
                        onClick={() => handleFilterChange("type", "simple")}
                        className={
                            `van-type simple 
                        ${typeFilter === "simple" ? "selected" : ""}`
                        }
                    >Simple</button>
                    <button
                        onClick={() => handleFilterChange("type", "luxury")}
                        className={
                            `van-type luxury 
                        ${typeFilter === "luxury" ? "selected" : ""}`
                        }
                    >Luxury</button>
                    <button
                        onClick={() => handleFilterChange("type", "rugged")}
                        className={
                            `van-type rugged 
                        ${typeFilter === "rugged" ? "selected" : ""}`
                        }
                    >Rugged</button>

                    {typeFilter ? (
                        <button
                            onClick={() => handleFilterChange("type", null)}
                            className="van-type clear-filters"
                        >Clear filter</button>
                    ) : null}

                </div>
                <Suspense fallback={<h2>Loading vans...</h2>}>
                    <Await resolve={dataPromise.vans}>
                        {renderVanElements}
                    </Await>
                </Suspense>
            </div>
        </main>
    )
}