import './loading.css'

export default function Loading() {
    return (
        <div id='loadingContainer' className='flex h-80 justify-center'>
            <svg viewBox="25 25 50 50" className='stroke-git-400'>
                <circle r="20" cy="50" cx="50"></circle>
            </svg>
        </div>
    )
}