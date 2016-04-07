Для запуска проекта на чистом компьютере:
    устанавливаем в систему NodeJS https://goo.gl/d7yusY
    запускаем в IntelliJ IDEA ant-таск "npm-install", это установит необходимые пакеты для проекта (или делаем то же самое через консоль в контексте папки проекта "your-project")
    устанавливаем Bower http://bower.io/
    запускаем в IntelliJ IDEA ant-таск "bower-install", это установит все внешние библиотеки в проект (или делаем то же самое через консоль в контексте папки проекта "your-project")
    устанавливаем Ruby https://goo.gl/d7yusY
    устанавливаем Compass http://compass-style.org/install/
    устанавливаем Grunt CLI http://gruntjs.com/getting-started
    запускаем ant-таск "grunt-serve" для работы с проектом.

В Ubuntu 15.10 всё происходило так:
    устанавливаю NodeJS https://goo.gl/d7yusY
        curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
        sudo apt-get install -y nodejs
    запускаю в IDEA ant-таск "npm-install"
    устанавливаю Bower http://bower.io/
        npm install -g bower
    запускаю в IDEA ant-таск "bower-install"
    устанавливаю Ruby
        sudo apt-get install ruby-full
    устанавливаю Compass
        sudo gem update --system
        sudo gem install compass
    устанавливаю Grunt CLI
        npm install -g grunt-cli
    запускаю ant-таск "grunt-serve"