import * as React from "react"
import { Link } from "react-router-dom"
import { Sparkles, Clock, ArrowRight, Loader2 } from "lucide-react"

export default function FeaturedCoursesSection({ featuredCourses, coursesLoading }) {
  const [hoveredCard, setHoveredCard] = React.useState(null)

  return (
    <section id="courses" className="py-16 px-3 sm:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-4">
            Featured Curriculum
          </span>
          <h2 className="text-2xl sm:text-4xl font-headline font-bold text-primary mb-4">Most Popular Pathways</h2>
          <p className="text-secondary">Join thousands of professionals accelerating their careers with our flagship programs.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : featuredCourses.length > 0 ? (
            featuredCourses.map((course, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-dim/20 hover:border-primary/30 transition-all hover:shadow-xl group"
              >
                <div className="flex justify-between items-start mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full capitalize">
                    {course.level}
                  </span>
                </div>
                <h3 className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors mb-2 line-clamp-1">{course.title}</h3>
                <div className="flex justify-between items-center text-sm text-secondary mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {course.duration} Hours
                  </span>
                </div>
                <Link
                  to={`/course/${course.id}`}
                  aria-label={`Learn more about ${course.title}`}
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all"
                >
                  Learn more about {course.title} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-secondary">
              No courses available at the moment.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
