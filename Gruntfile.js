module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {});

  var saveLicense = require('uglify-save-license');

  grunt.initConfig({
    site: {
      app: 'app',
      dist: 'dist',
      scripts: 'scripts'
    },

    clean: {
      files: {
        files: [
          {
            dot: true,
            src: '<%= site.dist %>/*'
          }
        ]
      }
    },

    execute: {
      sync_petition_code: {
        src: ['<%= site.scripts %>/sync_petition_code.js']
      }
    },

    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml',
        dest: '<%= site.dist %>',
        src: '<%= site.app %>'
      },
      build: {
        options: {
          config: '_config.yml,_config.build.yml'
        }
      },
      server: {
        options: {
          src: '<%= site.app %>'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },

    copy: {
      server: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= site.app %>',
            src: [
              'images/**/*'
            ],
            dest: '<%= site.dist %>'
          }
        ]
      }
    },

    less: {
      styles: {
        options: {
          compress: false,
          sourceMap: false
        },
        files: {
          '<%= site.dist %>/css/core.css': '<%= site.app %>/_less/core.less',
          '<%= site.dist %>/widget/banner/css/banner.css': '<%= site.app %>/widget/_less/banner.less',
          '<%= site.dist %>/widget/modal/css/modal.css': '<%= site.app %>/widget/_less/modal.less',
        }
      },
    },

    postcss: {
      compile: {
        options: {
          map: true,
          processors: [
            require('autoprefixer')({browsers: 'last 2 versions'}),
            require('cssnano')()
          ]
        },
        files: [
          {
            expand: true,
            cwd: '<%= site.dist %>/css',
            src: '**/*.css',
            dest: '<%= site.dist %>/css'
          }
        ]
      }
    },

    connect: {
      options: {
        hostname: '0.0.0.0',
        port: 9047,
        middleware: function (connect, options, middlewares) {
          middlewares.unshift(function (request, response, next) {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Methods', '*');
            return next();
          });
          return middlewares;
        },
        useAvailablePort: true
      },
      local: {
        options: {
          base: '<%= site.dist %>'
        }
      }
    },

    watch: {
      gruntfile: {
        files: ['Gruntfile.js'],
        options: {
          reload: true
        }
      },
      images: {
        files: ['<%= site.app %>/images/**/*.*'],
        tasks: ['copy:server']
      },
      less: {
        files: [
          '<%= site.app %>/_less/**/*.less',
          '<%= site.app %>/widget/_less/**/*.less',
        ],
        tasks: ['less:styles']
      },
      javascript: {
        files: [
          '<%= site.app %>/_js/**/*.js',
          '<%= site.app %>/widget/**/*.js',
        ],
        tasks: ['concat']
      },
      jekyll: {
        files: [
          '_*.*',
          '<%= site.app %>/**/*.{xml,html,yml,md,mkd,markdown,txt}'
        ],
        tasks: ['jekyll:server']
      }
    },

    concat: {
      options: {
        // sourceMap: false,
        // separator: grunt.util.linefeed + ';'
      },
      server: {
        files: [
          {
            src: [
              '<%= site.app %>/_js/LICENSE',
              '<%= site.app %>/_js/lib/util.js',
              '<%= site.app %>/_js/components/**/*.js',
              '<%= site.app %>/_js/callbacks/**/*.js',
              '<%= site.app %>/_js/controllers/**/*.js',
              '<%= site.app %>/_js/models/**/*.js',
              '<%= site.app %>/_js/views/**/*.js',
              '<%= site.app %>/_js/main.js'
            ],
            dest: '<%= site.dist %>/js/core.js'
          },
          {
            src: [
              '<%= site.app %>/_js/LICENSE',
              '<%= site.app %>/widget/widget.js',
            ],
            dest: '<%= site.dist %>/widget.js'
          },
          {
            src: [
              '<%= site.app %>/_js/LICENSE',
              '<%= site.app %>/widget/_js/common.js',
              '<%= site.app %>/widget/_js/banner.js',
            ],
            dest: '<%= site.dist %>/widget/banner/js/core.js'
          },
          {
            src: [
              '<%= site.app %>/_js/LICENSE',
              '<%= site.app %>/widget/_js/common.js',
              '<%= site.app %>/widget/_js/modal.js',
            ],
            dest: '<%= site.dist %>/widget/modal/js/core.js'
          },
        ]
      }
    },

    uglify: {
      options: {
        sourceMap: false,
        sourceMapIncludeSources: false,
        check: 'gzip',
        preserveComments: saveLicense
      },
      build: {
        files: {
          '<%= site.dist %>/js/core.js': '<%= site.dist %>/js/core.js',
          '<%= site.dist %>/widget.js': '<%= site.dist %>/widget.js',
          '<%= site.dist %>/widget/banner/js/core.js': '<%= site.dist %>/widget/banner/js/core.js',
          '<%= site.dist %>/widget/modal/js/core.js': '<%= site.dist %>/widget/modal/js/core.js'
        }
      }
    },

    concurrent: {
      external_scripts: [
        'execute:sync_petition_code'
      ],
      tasks: [
        'copy:server',
        'less:styles',
        'concat'
      ]
    }
  });

  grunt.registerTask('dev', [
    'concurrent:external_scripts',
    'clean:files',
    'jekyll:server',
    'concurrent:tasks',
    'connect:local',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:files',
    'jekyll:build',
    'concurrent:tasks',
    'postcss:compile'
  ]);

  grunt.registerTask('test', [
    'jekyll:check'
  ]);

  grunt.registerTask('default', [
    'dev'
  ]);
};
