import "./static/index.css";

window.onload = async () => {

    await Promise.all([
        import('remoteReact/App'),
        import('remoteAngular/App'),
        import('remoteSvelte/App')
    ]).then((modules) => {
        return modules.map((module) => {
            return module.default;
        })
    }).then((modules) => {
        modules.forEach((module) => module())
    });

    const $wrapper = document.getElementById('wrapper');

    $wrapper.onclick = () => {
        if ($wrapper.classList.contains('fence')) {
            $wrapper.classList.remove('fence');
            $wrapper.classList.add('container');
        }
    }
}