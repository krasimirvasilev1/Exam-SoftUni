using System.Linq;
using System.Net;
using System.Web.Mvc;
using IMDB.Models;

namespace IMDB.Controllers
{
    [ValidateInput(false)]
    public class FilmController : Controller
    {
        [HttpGet]
        [Route("")]
        public ActionResult Index()
        {
            using (var db = new IMDBDbContext())
            {
                var tasks = db.Films.ToList();

                return View(tasks);
            }
        }

        [HttpGet]
        [Route("create")]
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [Route("create")]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Film film)
        {
            using (var db = new IMDBDbContext())
            {
                if (ModelState.IsValid)
                {

                    db.Films.Add(film);
                    db.SaveChanges();

                    return RedirectToAction("Index");
                    
                }

                return RedirectToAction("Index");
            }
        }

        [HttpGet]
        [Route("edit/{id}")]
        public ActionResult Edit(int? id)
        {
            using (var db = new IMDBDbContext())
            {
                var filmId = db.Films.Find(id);

                if (filmId == null)
                {
                    return RedirectToAction("Index");
                }


                return View(filmId);

            }
        }

        [HttpPost]
        [Route("edit/{id}")]
        [ValidateAntiForgeryToken]
        public ActionResult EditConfirm(int? id, Film filmModel)
        {
            using (var db = new IMDBDbContext())
            {
                var filmId = db.Films.Find(id);

                if (filmId == null)
                {
                    return RedirectToAction("Index");
                }

                if (ModelState.IsValid)
                {
                    filmId.Name = filmModel.Name;
                    filmId.Genre = filmModel.Genre;
                    filmId.Director = filmModel.Director;
                    filmId.Year = filmModel.Year;

                    db.SaveChanges();

                    return RedirectToAction("Index");
                }

                return RedirectToAction("Index");

            }
        }

        [HttpGet]
        [Route("delete/{id}")]
        public ActionResult Delete(int? id)
        {
            using (var db = new IMDBDbContext())
            {
                var filmId = db.Films.Find(id);

                if (filmId == null)
                {
                    return RedirectToAction("Index");
                }

                return View(filmId);
            }

        }

        [HttpPost]
        [Route("delete/{id}")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirm(int? id, Film filmModel)
        {
            using (var db = new IMDBDbContext())
            {
                var filmId = db.Films.Find(id);

                if (filmId == null)
                {
                    return RedirectToAction("Index");
                }

                db.Films.Remove(filmId);
                db.SaveChanges();

                return RedirectToAction("Index");
            }
        }
    }
}