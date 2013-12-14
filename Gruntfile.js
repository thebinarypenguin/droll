module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Lint
    jshint: {
      all: ['Gruntfile.js', '<%= pkg.name %>.js', 'bin/*.js', 'test/*.js'],
    },

    // Minify
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %>  <%= pkg.repository.url %> */\n'
      },
      all: {
        files: {
          '<%= pkg.name %>.min.js': ['<%= pkg.name %>.js']
        }
      }
    },

    // Test
    mochacli: {
      options: {
        reporter: 'spec'
      },
      all: ['test/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.registerTask('lint',   ['jshint']);
  grunt.registerTask('minify', ['uglify']);
  grunt.registerTask('test',   ['mochacli']);

  grunt.registerTask('default', ['jshint', 'mochacli']);

};